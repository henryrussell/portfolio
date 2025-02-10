'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

interface SkillItemProps extends Skill {
  onLevelChange: (skillName: string, newLevel: number) => void;
}

export default function SkillItem({ name, level, onLevelChange }: SkillItemProps) {
  const initialLevel = typeof level === 'number' ? level : 0;
  const [currentLevel, setCurrentLevel] = useState(100);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false); // This line is *essential*
  const [sliderLevel, setSliderLevel] = useState(100); // New state
  const [hasInteracted, setHasInteracted] = useState(false); // Renamed and adjusted
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref is OUTSIDE the callback

  useEffect(() => {
    if(!hasInteracted){
    setCurrentLevel(initialLevel);
    setSliderLevel(initialLevel); // Initialize sliderLevel here as well
    }
  }, [initialLevel, hasInteracted]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true); // This line is *essential*
    setHasInteracted(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      const offsetX = e.clientX - sliderRect.left;
      let newLevel = Math.round((offsetX / sliderWidth) * 100);
      newLevel = Math.max(0, Math.min(100, newLevel));
      setCurrentLevel(newLevel);
      setSliderLevel(newLevel);
      onLevelChange(name, newLevel);
    }
  }, [isDragging, onLevelChange, name]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false); // This line is *essential*
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setSliderLevel(currentLevel); // Reset slider to currentLevel
    // Update currentLevel after transition (using setTimeout)
    if(timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null; // Clear the ref
    }
    
    timeoutRef.current = setTimeout(() => {
        setCurrentLevel(currentLevel);
        setSliderLevel(currentLevel);
        timeoutRef.current = null; // Clear the ref
      }, 300);
  
    }, [currentLevel]); // currentLevel is a dependency for the outer useCallback
  
    useEffect(() => {
        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])


  return (
    <div className="skill-item">
      <h4>{name}</h4>
      <div
        className="skill-level-container relative"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        style={{ cursor: 'pointer' }}
      >
        <div
          className="skill-level"
          style={{ width: `${sliderLevel}%`, backgroundColor: typeof level === 'number' ? 'green' : 'gray', transition: 'width 0.3s ease-in-out' }}
        ></div>
        <div className="handle" style={{ left: `${sliderLevel}%`, position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'gray' }}></div>
      </div>
      {typeof level === 'string' && <p>{level}</p>}
      <p>{currentLevel}</p>
      {sliderLevel === 100 &&
        <p>Wow so generous!</p>
      }
    </div>
  );
}