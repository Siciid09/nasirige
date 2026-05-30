import React from "react";
// Adjust this import path if you saved your ProjectView component in a different folder
import ProjectView from "../../../components/projectview"; 

export default function ProjectPage() {
  return (
    // We simply render the component here. 
    // The component itself will read the [slug] from the URL and fetch the correct data!
    <ProjectView />
  );
}