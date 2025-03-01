// src/app/api/triggerWorkflow/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const githubToken = process.env.GITHUB_TOKEN;
  const workflowId = 'mainTests.yml';
  const owner = 'henryrussell';
  const repo = 'self-testing-website';

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref: 'main' }),
    });

    if (response.ok) {
      const runsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`, {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
        },
      });

      if (runsResponse.ok) {
        const runsData = await runsResponse.json();
        const runId = runsData.workflow_runs[0]?.id;

        if (runId) {
          return NextResponse.json({ message: 'Workflow triggered successfully', run_id: runId }, { status: 200 });
        } else {
          return NextResponse.json({ error: { message: 'Failed to retrieve run ID' } }, { status: 500 });
        }
      } else {
        const runsError = await runsResponse.json();
        return NextResponse.json({ error: runsError }, { status: runsResponse.status });
      }
    } else {
      const error = await response.json();
      return NextResponse.json({ error: error }, { status: response.status });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: { message: error.message } }, { status: 500 });
    } else {
      return NextResponse.json({ error: { message: "an unknown error occurred" } }, { status: 500 });
    }
  }
}
