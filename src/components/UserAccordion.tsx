import ExpandMore from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  CircularProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getUser } from '../api';
import { UserList } from '../types';

export interface IUserAccordionProps {
  userList?: UserList
};

const UserAccordion = ({userList}: IUserAccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [queryParams, setQueryParams] = useState<number>(0);
  const { data: userData, error, isFetching } = useQuery(
    ['users', queryParams],
    () => getUser(queryParams),
    { enabled: !!queryParams, refetchOnWindowFocus: false }
  );

  const handleChange = (panel: string, userId: number) => (e: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    setQueryParams(userId);
  };

  userData && console.log(userData);

  return (
    <>
      {userList?.items?.map((user, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${index}`}
            key={index}
            onChange={handleChange(`panel${index}`, user.id)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              aria-controls={`panel${index}bh-content`}
              expandIcon={<ExpandMore />}
              id={`panel${index}bh-header`}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Box sx={{ display: 'flex', width: '20%' }}>
                <Avatar
                  alt={`${user}'s profile picture`}
                  src={user.avatar_url}
                />
              </Box>
              <Typography
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexShrink: 0,
                  width: '33%'
                }}
              >
                {user.login}
              </Typography>
              <Link
                href={user.html_url}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                View {user.login}'s profile on Github
              </Link>
            </AccordionSummary>
            <AccordionDetails>
            {isFetching ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={42}/>
              </Box>
            ) : (
              <Stack direction='row'>
                <List sx={{ width: '50%' }}>
                  <ListItem>
                    <ListItemText primary={userData?.name || 'Not Specified'} secondary='Name' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={userData?.location || 'Not Specified'} secondary='Location' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={userData?.email || 'Not Specified'} secondary='Email' />
                  </ListItem>
                </List>
                <List>
                  <ListItem>
                    <ListItemText primary={userData?.public_repos || 'None'} secondary='Public Repos' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={userData?.created_at.toString() || 'Not Specified'} secondary='Created' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={userData?.updated_at.toString() || 'Not Specified'} secondary='Latest Update' />
                  </ListItem>
                </List>
              </Stack>
            )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default UserAccordion;