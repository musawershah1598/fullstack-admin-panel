import React from "react";
import { NavLink, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

const BreadcrumbComponent = () => {
  const location = useLocation();
  const path = location.pathname.split("/").slice(-2);
  return (
    <Breadcrumb>
      <BreadcrumbList className=" capitalize">
        <BreadcrumbItem>
          <NavLink to={"/pages/dashboard/overview"}>Home</NavLink>
        </BreadcrumbItem>

        {path.map((item, key) => {
          return (
            <React.Fragment key={"breadcrumb" + key}>
              <BreadcrumbSeparator />
              {key == 0 ? (
                <BreadcrumbItem key={"breadcrumb-" + key}>
                  {item}
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem key={"breadcrumb-" + key}>
                  <NavLink to={"/pages/" + path.join("/")}>{item}</NavLink>
                </BreadcrumbItem>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
