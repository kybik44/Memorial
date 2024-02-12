import Link, { LinkProps } from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

interface BreadcrumbsLinkProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const BreadcrumbsLink = (props: BreadcrumbsLinkProps) => {
  return <Link {...props} component={RouterLink as any} />;
};

export default BreadcrumbsLink;
