import React from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaCheckCircle,
  FaFilter,
  FaLayerGroup,
  FaUserNinja,
} from "react-icons/fa";
import { FcAndroidOs } from "react-icons/fc";
import { FaApple, FaPlay, FaChrome } from "react-icons/fa";
import { SiSafari } from "react-icons/si";
import { DiJira } from "react-icons/di";
import { GiAcid } from "react-icons/gi";
import { IoPhonePortraitOutline, IoRocketOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { FaChartPie } from "react-icons/fa";
import {
  AiFillCloseCircle,
  AiOutlineApi,
  AiFillBuild,
  AiOutlineSetting,
} from "react-icons/ai";
import { GiPauseButton } from "react-icons/gi";
import { BiArrowFromRight } from "react-icons/bi";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { TiImage } from "react-icons/ti";
import {
  BsClockFill,
  BsFillExclamationTriangleFill,
  BsSquare,
  BsFileCode,
} from "react-icons/bs";
import { CgHome, CgChevronRight, CgChevronLeft } from "react-icons/cg";
import { MdOutlineDone } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { ImBin } from "react-icons/im";
import { SiCsswizardry } from "react-icons/si";
import { TiDocumentText } from "react-icons/ti";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

export enum Sizes {
  S = "12",
  M = "14",
  L = "16",
  XL = "18",
  XXL = "20",
  XXXL = "25",
}

const Container = styled.span<{ size?: string; color?: string }>`
  font-size: ${(props) => props.size || 14}px;
  vertical-align: middle;
  color: ${(props) => props.color};
`;

type IconProps = {
  name: string;
  onClick?: (event?: any) => void;
  size?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "right" | "left";
  color?: string;
  className?: string;
};

function wrapIconWithTooltip(icon: any, props: IconProps) {
  const { tooltip, tooltipPosition } = props;
  if (!tooltip) {
    return icon;
  } else {
    return (
      <Tooltip
        title={tooltip}
        placement={tooltipPosition}
        arrow
        classes={{
          tooltip: "custom-tooltip-container",
          arrow: "custom-tooltip-arrow",
        }}
      >
        {icon}
      </Tooltip>
    );
  }
}

export default function Icon(props: IconProps) {
  const { name, onClick, size, color, className } = props;
  let icon;

  switch (name) {
    case "home":
      icon = <CgHome />;
      break;
    case "android":
      icon = <FcAndroidOs />;
      break;
    case "ios":
      icon = <FaApple />;
      break;
    case "safari":
      icon = <SiSafari />;
      break;
    case "chrome":
      icon = <FaChrome />;
      break;
    case "arrow-up":
      icon = <FaAngleUp />;
      break;
    case "arrow-down":
      icon = <FaAngleDown />;
      break;
    case "success":
      icon = <FaCheckCircle />;
      break;
    case "error":
      icon = <AiFillCloseCircle />;
      break;
    case "time":
      icon = <BsClockFill />;
      break;
    case "filter":
      icon = <FaFilter />;
      break;
    case "delete":
      icon = <ImBin />;
      break;
    case "mobile":
      icon = <IoPhonePortraitOutline />;
      break;
    case "tick":
      icon = <MdOutlineDone />;
      break;
    case "exclamation":
      icon = <BsFillExclamationTriangleFill />;
      break;
    case "pause":
      icon = <GiPauseButton />;
      break;
    case "play":
      icon = <FaPlay />;
      break;
    case "collapse":
      icon = <BiArrowFromRight />;
      break;
    case "close":
      icon = <IoClose />;
      break;
    case "expand-arrow":
      icon = <AiFillCaretRight />;
      break;
    case "collapse-arrow":
      icon = <AiFillCaretDown />;
      break;
    case "document":
      icon = <TiDocumentText />;
      break;
    case "api":
      icon = <AiOutlineApi />;
      break;
    case "square":
      icon = <BsSquare />;
      break;
    case "image":
      icon = <TiImage />;
      break;
    case "css":
      icon = <SiCsswizardry />;
      break;
    case "code":
      icon = <BsFileCode />;
      break;
    case "build":
      icon = <AiFillBuild />;
      break;
    case "launch":
      icon = <IoRocketOutline />;
      break;
    case "chevron-right":
      icon = <CgChevronRight />;
      break;
    case "chevron-left":
      icon = <CgChevronLeft />;
      break;
    case "settings":
      icon = <AiOutlineSetting />;
      break;
    case "project":
      icon = <FaLayerGroup />;
      break;
    case "jira":
      icon = <DiJira />;
      break;
    case "test-rail":
      icon = <GiAcid />;
      break;
    case "users":
      icon = <FaUserNinja />;
      break;
    case "edit":
      icon = <HiPencil />;
      break;
    case "more":
      icon = <IoMdMore />;
      break;
    case "chart":
      icon = <FaChartPie />;
      break;
    default:
      icon = null;
  }
  const clsName = className ? `${className} icon` : "icon";
  const container = (
    <Container onClick={onClick} size={size} className={clsName} color={color}>
      {icon}
    </Container>
  );
  return wrapIconWithTooltip(container, props);
}
