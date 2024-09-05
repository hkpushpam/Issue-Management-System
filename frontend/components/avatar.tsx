import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'


interface AvatarProps {
    name: string;
}

const AvatarComponent: React.FC<AvatarProps> = ({ name }) => {
    const [bgColor, setBgColor] = useState<string>('');

    useEffect(() => {
        setBgColor(getRandomColor());
    }, []);
    return (
        
        <Avatar style={{ backgroundColor: bgColor }} className={cn('p-2 rounded-full', getRandomColor())}>
            <AvatarImage alt={name} />
            <AvatarFallback>
                {name
                    .split(" ")
                    .map((chunk: string) => chunk[0])
                    .join("")}
            </AvatarFallback>
        </Avatar>
    );
}

function getRandomColor(): string {
    const colors: string[] = [
        "255,0,0", "0,0,255", "0,255,0", "255,255,0", "128,0,128", "0,255,255", "255,0,255",
        "255,165,0", "255,192,203", "139,69,19", "0,0,0", "255,255,255", "128,128,128", "238,130,238"
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    return `rgba(${color}, 0.4)`;
}

export default AvatarComponent;