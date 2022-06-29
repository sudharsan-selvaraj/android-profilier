import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
.MuiList-root {
    background: ${(props) => props.theme.colors.bg_secondary};
    color: ${(props) => props.theme.colors.font_primary};
    border: 1px solid ${(props) => props.theme.colors.border};
    max-height: 200px;
    overflow: auto;
  }

  .MuiList-root li {
      font-size: 15px!important;
  }

  a.nav-link {
    color: ${(props) => props.theme.colors.link_active}!important;
  }

  a.nav-link:visited {
    color: ${(props) => props.theme.colors.link_visited}!important;
  }
`;
