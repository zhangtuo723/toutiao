import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { hasToken } from "@/utils/storage";


export default function AuthoRoute(props) {
  const location = useLocation();
  const na = useNavigate();
  useEffect(() => {
    if (!hasToken()) {
      na("/login", { state: {pathfrom:location.pathname},replace:true });
    }
  });

  return props.children;
}
