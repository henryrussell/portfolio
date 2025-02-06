import Image from 'next/image';

export default function ProjectCard({ title, description, image, link }: Project) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      {image && (
        <Image src={image} alt={title} width={500} height={300} />
      )}
      {description && <p>{description}</p>} {/* Conditionally render description */}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      )}
    </div>
  );
}
