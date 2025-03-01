import { useState, useEffect } from "react";

export default function WorkflowStatusComponent({ runId }: WorkflowStatusProps) {
  const [workflowStatus, setWorkflowStatus] = useState("Loading...");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const githubToken = process.env.GITHUB_TOKEN;
    const fetchWorkflowStatus = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/henryrussell/self-testing-website/actions/runs/${runId}`,
          {
            headers: {
              Authorization: `Bearer ${githubToken}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setWorkflowStatus(data.conclusion || data.status); // Use conclusion if available, otherwise status
        } else {
          setWorkflowStatus(`Error fetching status: ${data.message}`);
        }
      } catch (error) {
        if (error instanceof Error){
            setWorkflowStatus(`Error fetching status: ${error.message}`);
        } else {
            console.error('Health check: Failure', error);
        }
      }
    };

    const fetchLogs = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/your-username/your-repo/actions/runs/${runId}/logs`,
          {
            headers: {
              Authorization: `Bearer ${githubToken}`,
            },
          }
        );

        if (response.ok) {
          const logText = await response.text();
          setLogs(logText.split("\n")); // Split the log text into lines
        } else {
          console.error("Error fetching logs:", response.status);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    const intervalId = setInterval(() => {
      fetchWorkflowStatus();
      fetchLogs();
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, [runId]);

  return (
    <div className="workflow-status">
      <h3>Workflow Status: {workflowStatus}</h3>
      <div className="logs">
        {logs.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}