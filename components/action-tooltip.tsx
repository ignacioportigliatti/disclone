'use client'

import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider } from './ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

interface ActionTooltip {
    label: string;
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
}

const ActionTooltip = (props: ActionTooltip) => {
    const { label, children, side = 'top', align = 'center' } = props;

    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className='font-semibold text-sm '>
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ActionTooltip
