import { chakra, Collapse, Flex } from '@chakra-ui/react';
import { dataAttr } from '@chakra-ui/utils';
import React from 'react';
import { useStepsContext } from '../../context';
import { StepSharedProps } from '../../types';
import { StepIcon } from '../StepIcon';
import { StepIconContainer } from '../StepIconContainer';
import { StepLabel } from '../StepLabel';
import { useStepsStyles } from '../Steps';

type VerticalStepProps = StepSharedProps & {
  children?: React.ReactNode;
};

export const VerticalStep = React.forwardRef<HTMLDivElement, VerticalStepProps>(
  (props, ref) => {
    const {
      children,
      index,
      isCompletedStep,
      isCurrentStep,
      label,
      description,
      icon,
      hasVisited,
    } = props;

    const { checkIcon, isError, isLoading, variant } = useStepsContext();

    const { step, stepIconContainer } = useStepsStyles();

    const opacity = hasVisited ? 1 : 0.8;

    const highlighted =
      variant === 'simple' ? isCompletedStep || isCurrentStep : isCompletedStep;

    return (
      <chakra.div
        ref={ref}
        className="cui-steps__vertical-step"
        data-highlighted={dataAttr(highlighted)}
        __css={step}
      >
        <Flex className="cui-steps__vertical-step-container">
          <StepIconContainer {...props}>
            <StepIcon
              {...{
                index,
                isError,
                isLoading,
                isCurrentStep,
                isCompletedStep,
              }}
              icon={icon}
              checkIcon={checkIcon}
            />
          </StepIconContainer>
          <StepLabel
            label={label}
            description={description}
            {...{ isCurrentStep, opacity }}
          />
        </Flex>
        <chakra.div
          className="cui-steps__vertical-step-content"
          __css={{ minH: '8px', pl: `calc(${stepIconContainer.width})` }}
        >
          <Collapse style={{ width: '100%' }} in={isCurrentStep}>
            {(isCurrentStep || isCompletedStep) && children}
          </Collapse>
        </chakra.div>
      </chakra.div>
    );
  }
);
