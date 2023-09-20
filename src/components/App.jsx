import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = { good, neutral, bad };

  const total = Object.values(options).reduce((acc, num) => acc + num, 0);

  const positivePercentage = Math.round((good / total) * 100);

  const onLeaveFeedback = evt => {
    const option = evt.target.textContent;
    switch (option) {
      case 'good':
        setGood(count => count + 1);
        break;
      case 'neutral':
        setNeutral(count => count + 1);
        break;
      case 'bad':
        setBad(count => count + 1);
        break;
      default:
        throw new Error('Wrong option type.');
    }
  };

  return (
    <Section title="Please leave feedback!">
      <FeedbackOptions
        options={Object.keys(options)}
        onLeaveFeedback={onLeaveFeedback}
      />
      {total ? (
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          total={total}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message={'There is no feedback!'} />
      )}
    </Section>
  );
};
