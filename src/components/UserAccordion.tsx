import ExpandMore from '@mui/icons-material/ExpandMore';
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
  const [username, setUsername] = useState<string>('');
  const { data: userData, error, isFetching } = useQuery(
    ['users', username],
    () => getUser(username),
    { enabled: !!username, refetchOnWindowFocus: false }
  );

  const handleChange = (panel: string, username: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    setUsername(username);
  };

  if (error) console.error(error);

  console.log(userData.data);

  return (
    <>
      {userList?.items?.map((user, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${index}`}
            key={index}
            onChange={handleChange(`panel${index}`, user.login)}
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
                  sx={{
                    height: expanded === `panel${index}` ? '100px' : '40px',
                    width: expanded === `panel${index}` ? '100px' : '40px'
                  }}
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
                    <ListItemText primary={userData?.data.name || 'Not Specified'} secondary='Name' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={userData?.data.location || 'Not Specified'} secondary='Location' />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={userData?.data.email || 'Not Specified'} secondary='Email' />
                  </ListItem>
                </List>
                <List>
                  <ListItem>
                    <ListItemText primary={userData?.data.public_repos || 'None'} secondary='Public Repos' />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={userData && (new Date(userData.data.created_at).toLocaleDateString('en-US') || 'Not Specified')}
                      secondary='Created'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={userData && (new Date(userData.data.updated_at).toLocaleDateString('en-US') || 'Not Specified')}
                      secondary='Latest Update'
                    />
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