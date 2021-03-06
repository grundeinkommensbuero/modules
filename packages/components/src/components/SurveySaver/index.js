import React, { useEffect } from 'react';
import querystring from 'query-string';
import { useSaveSurveyAnswer } from '../../hooks/api/surveys';

export default ({ children }) => {
  const [, saveSurveyAnswer] = useSaveSurveyAnswer();

  useEffect(() => {
    // If survey code, save survey
    if (typeof window !== `undefined`) {
      // Check if there are url params from a survey
      const { answer, surveyCode } = querystring.parse(window.location.search);

      if (surveyCode && answer) {
        saveSurveyAnswer(surveyCode, answer);
      }
    }
  }, []);

  return <>{children}</>;
};
