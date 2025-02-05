import React, { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Typography, Button } from '@mui/material';
import { Statistics, StatsService } from 'src/services/openapi';
import { useCurrentPoll } from 'src/hooks';

// PublicDownloadSection is a paragraph displayed on the HomePage
// that helps users know how to download the public video comparisons available for their use case
const PublicDownloadSection = () => {
  const { t } = useTranslation();
  const api_url = process.env.REACT_APP_API_URL;
  const { name: pollName } = useCurrentPoll();

  const [userCount, setUserCount] = useState<number>(0);
  const [comparedEntityCount, setComparedEntityCount] = useState<number>(0);
  const [comparisonCount, setComparisonCount] = useState<number>(0);

  useEffect(() => {
    StatsService.statsRetrieve()
      .then((value: Statistics) => {
        setUserCount(value.active_users.total);
        const pollStats = value.polls.find(({ name }) => name === pollName);
        if (pollStats !== undefined) {
          setComparedEntityCount(pollStats.compared_entities.total);
          setComparisonCount(pollStats.comparisons.total);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [pollName]);

  return (
    <>
      <Typography variant="h1">{t('about.publicDatabase')}</Typography>
      <Typography paragraph>
        <Trans t={t} i18nKey="about.publicDatabaseDetailAndLicense">
          Contributors on Tournesol can decide to make their data public. We
          hope this important data will prove useful for researchers on ethics
          of algorithms and large scale recommender systems. Our public database
          can be downloaded by clicking the button below and is published under{' '}
          <a
            href="https://opendatacommons.org/licenses/by/1-0/"
            style={{ color: 'white' }}
          >
            Open Data Commons Attribution License (ODC-By)
          </a>
          .
        </Trans>
      </Typography>
      <Typography paragraph>
        <Trans t={t} i18nKey="about.publicDatabaseThanksToContributors">
          Finally, we would like to thank all the contributors who compared
          videos on Tournesol. We count so far about {{ userCount }} users who
          compared {{ comparisonCount }} times more than{' '}
          {{ comparedEntityCount }} videos.
        </Trans>
      </Typography>

      <Button
        component="a"
        href={`${api_url}/exports/all/`}
        download="tournesol_public_export.csv"
        color="primary"
        variant="contained"
      >
        {t('clickToDownload')}
      </Button>
    </>
  );
};

export default PublicDownloadSection;
