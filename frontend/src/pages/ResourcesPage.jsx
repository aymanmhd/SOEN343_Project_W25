import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/ResourcesPage.css";

const ResourcesPage = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);

  // Simulate loading resources from the backend
  useEffect(() => {
    // BACKEND: Replace with actual API call, e.g.
    // fetch("/api/resources")
    //   .then(res => res.json())
    //   .then(data => setResources(data));

    const mockResources = [
      {
        id: 1,
        eventTitle: "React Basics Workshop",
        resourceName: "Slides: Introduction to React",
        resourceType: "PDF",
        description: "Slides covering React core concepts and setup.",
        fileUrl: "https://example.com/react-intro.pdf",
      },
      {
        id: 2,
        eventTitle: "Advanced Node.js Conference",
        resourceName: "Node.js Best Practices",
        resourceType: "Document",
        description: "A compilation of best practices for Node.js development.",
        fileUrl: "https://example.com/node-best-practices.docx",
      },
      {
        id: 3,
        eventTitle: "Cloud Computing Summit",
        resourceName: "AWS Architecture Overview",
        resourceType: "PDF",
        description: "Deep dive into AWS microservices architecture.",
        fileUrl: "https://example.com/aws-architecture.pdf",
      },
    ];

    setResources(mockResources);
  }, []);

  const handleUploadResource = () => {
    // BACKEND: Replace with logic to upload resource, 
    // e.g. open a modal to add new resource or navigate to an upload form
    alert("Upload resource clicked (placeholder).");
  };

  const handleDownload = (fileUrl) => {
    // BACKEND: In a real scenario, you'd verify user access, 
    // track analytics or usage logs, etc.
    // For now we just direct to the file link:
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="resources-page">
      <h2 className="resources-title">Event Resources & Digital Materials</h2>

      {/* If the user is an organizer, show the "Upload Resource" button */}
      {user && user.role === "organizer" && (
        <div className="upload-resource">
          <button className="btn-upload" onClick={handleUploadResource}>
            Upload Resource
          </button>
        </div>
      )}

      {resources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        <div className="resources-list">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-item">
              <h3 className="resource-event-title">{resource.eventTitle}</h3>
              <div className="resource-details">
                <p>
                  <strong>Name:</strong> {resource.resourceName}
                </p>
                <p>
                  <strong>Type:</strong> {resource.resourceType}
                </p>
                <p>
                  <strong>Description:</strong> {resource.description}
                </p>
              </div>

              <button
                className="btn-download"
                onClick={() => handleDownload(resource.fileUrl)}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
