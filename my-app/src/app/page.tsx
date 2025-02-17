'use client'
import ProjectCard from './components/ProjectCard';
import SkillItem from './components/SkillItem';
import Intro from './components/Intro';
import { useState } from 'react';
import TestRunnerComponent from './components/TestRunnerComponent';

export default function Home() {
  const projects: Project[] = [ // projects is an array of Projects, hence the []
    {
      title: 'Project 1',
      description: 'A brief description of your project.',
      video: '/flockingRecording.mp4',
      link: 'https://github.com/yourusername/project1',
    },
    // ... more projects
  ];

  const [skills, setSkills] = useState([
    { name: 'React', level: 0 },
    { name: 'Next.js', level: 0 },
    { name: 'Tailwind', level: 0 },
    { name: 'TypeScript', level: 0 },
    { name: 'Jest', level: 0 },
    { name: 'Playwright', level: 0 },
  ]);

  const handleSkillLevelChange = (skillName: string, newLevel: number) => {
    setSkills(prevSkills =>
      prevSkills.map(skill =>
        skill.name === skillName ? { ...skill, level: newLevel } : skill
      )
    );
  };

  return (
    <div>
      <section id='intro'>
        <Intro></Intro>
      </section>

      <section id='test-runner'>
        <TestRunnerComponent></TestRunnerComponent>
      </section>

      <section id="projects">
          <h2>My Projects</h2>
          <div className="projects-grid">
          {projects.map((project, index) => ( //iterate over each item in the projects array and execute a function for each item
              <ProjectCard key={index} {...project} /> 
              //the key prop helps react efficiently update the list when items are changed. 
              // ...project just includes everything in the project object
          ))}
          </div>
      </section>

      <section id="skills">
          <h2>Rate The Skills I Used To Make This Site!</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <SkillItem 
                key={index} 
                {...skill}
                onLevelChange={handleSkillLevelChange}
              />
            ))}
          </div>
      </section>
    </div>
  );
}
