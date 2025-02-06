export default function SkillItem({ name, level }: Skill) {
    const levelPercentage = typeof level === 'number' ? level : 0; // Handle level as percentage

    return (
        <div className="skill-item">
        <h4>{name}</h4>
        <div className="skill-level" style={{ width: `${levelPercentage}%` }}></div>
        {typeof level === 'string' && <p>{level}</p>} {/* Display description if level is a string */}
        </div>
    );
}
