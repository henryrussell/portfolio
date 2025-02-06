import Header from './components/Header';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';
import SkillItem from './components/SkillItem';


export default function Home() {
  const projects: Project[] = [ // projects is an array of Projects, hence the []
    {
      title: 'Project 1',
      description: 'A brief description of your project.',
      image: '/images/project1.jpg',
      link: 'https://github.com/yourusername/project1',
    },
    // ... more projects
  ];

  const skills: Skill[] = [
      { name: 'JavaScript', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'TypeScript', level: 'Proficient' }, // Example of a string level
      // ... more skills
    ];

  return (
    <div>
      <Header />
      <main>
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
            <h2>My Skills</h2>
            <div className="skills-grid">
            {skills.map((skill, index) => (
                <SkillItem key={index} {...skill} />
            ))}
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
