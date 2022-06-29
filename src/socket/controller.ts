import { Socket } from 'socket.io';
import { Dependencies } from '../constants';
import { EventEmitter } from 'stream';
import Container from 'typedi';
import { SessionManager } from '../session-manager';
import { SessionModal } from '../models/sessions';
import _ from 'lodash';
import { invokeCallback } from '../utils';
import { Profiling } from '../models/profiling';

class SocketController {
  private sessionEventEmitter: EventEmitter;
  private static sessionMap: Map<string, SessionManager> = new Map();

  constructor(private socket: Socket) {
    this.sessionEventEmitter = Container.get(
      Dependencies.SESSION_EVENT_EMITTER
    );

    socket.on('start_session', this.startSession.bind(this));
    socket.on('stop_session', this.stopSession.bind(this));
    socket.on('join_room', this.addSocketToSessionRoom.bind(this));
    socket.on('leave_room', this.removeSocketFromSessionRoom.bind(this));
  }

  private async startSession(
    message: { sessionId: string },
    callback: () => void
  ) {
    const { sessionId } = message;
    const session = await SessionModal.findOne({
      where: {
        uuid: sessionId,
      },
    });
    if (!SocketController.sessionMap.has(sessionId)) {
      if (session && !session.completed) {
        const sessionManager = new SessionManager(
          session,
          session.device_udid,
          this.sessionEventEmitter
        );
        SocketController.sessionMap.set(sessionId, sessionManager);
        await sessionManager.startLogging();
        this.socket.join(sessionId);
        invokeCallback(callback, { success: true });
      }
    } else {
      const logs = await Profiling.findAll({
        where: {
          session_id: session?.id,
        },
      });
      this.socket.join(sessionId);
      invokeCallback(callback, {
        alreadyStarted: true,
        logs: logs,
      });
    }
  }

  private async stopSession(
    message: { sessionId: string },
    callback: () => void
  ) {
    const { sessionId } = message;
    if (SocketController.sessionMap.has(sessionId)) {
      const sessionManager = SocketController.sessionMap.get(
        sessionId
      ) as SessionManager;
      await sessionManager.stopLogging();
      await SessionModal.update(
        {
          completed: true,
        },
        {
          where: {
            uuid: sessionId,
          },
        }
      );
      this.sessionEventEmitter.emit('session_completed', {
        sessionId: sessionId,
      });
    }

    invokeCallback(callback, {
      success: true,
    });
  }

  private async addSocketToSessionRoom(
    message: { sessionId: string },
    cb: () => any
  ) {
    const { sessionId } = message;
    const session = await SessionModal.findOne({
      where: {
        uuid: sessionId,
      },
    });

    const logs = await Profiling.findAll({
      where: {
        session_id: session?.id,
      },
    });
    this.socket.join(sessionId);
    const isStarted = SocketController.sessionMap.has(sessionId);
    invokeCallback(cb, {
      logs,
      isStarted,
    });
  }

  private removeSocketFromSessionRoom(message: { sessionId: string }) {
    const { sessionId } = message;
    this.socket.leave(sessionId);
  }
}

export { SocketController };
