import React, { isValidElement } from 'react';
import type { ReactNode } from 'react';

import styles from './Step.module.css';

type ChildrenProps = { children: ReactNode };

const Title = ({ children }: ChildrenProps) => children;
const Description = ({ children }: ChildrenProps) => children;
const Footer = ({ children }: ChildrenProps) => children;

( Title as any).slotId = 'StepTitle';
( Description as any).slotId = 'StepDescription';
( Footer as any).slotId = 'StepFooter';

function Step({ children } : ChildrenProps) {

    const childrenList = React.Children.toArray(children);

    const getSlot = (id: string) => {
        return childrenList.find((child) => isValidElement(child) && (child.type as any)?.slotId === id
        );
    };

    const titleSlot = getSlot('StepTitle');
    const descriptionSlot = getSlot('StepDescription');
    const footerSlot = getSlot('StepFooter');

    const content = childrenList.filter((child) => 
        !isValidElement(child) || (
            child.type !== Title && (child.type as any)?.slotId !== 'StepTitle' 
            && (child.type as any)?.slotId !== 'StepFooter' && child.type !== Footer
            && (child.type as any)?.slotId !== 'StepDescription' && child.type !== Description
        )
    );

    return(<>
        <div className={styles.step}>
            {titleSlot && (
                <div className={styles.title}>{titleSlot}</div>
            )}

            {descriptionSlot && (
                <div className={styles.description}>{descriptionSlot}</div>
            )}

            {content && (
                <div>
                    {content}
                </div>
            )}

            {footerSlot && (
                <div className={styles.footer}>{footerSlot}</div>
            )}
        </div>
    </>);
}

Step.Title = Title;
Step.Description = Description;
Step.Footer = Footer;

export default Step;
