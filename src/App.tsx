import CssBaseline from '@mui/material/CssBaseline';
import {
  Box,
  Container,
  Stack
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Octokit } from 'octokit';

import { Main } from './components';

const queryClient = new QueryClient();

export const octokit = new Octokit({ auth: process.env.REACT_APP_TOKEN });

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Container fixed>
          <Box sx={{ marginBottom: '10%', marginTop: '10%', width: '100%' }}>
            <Stack spacing={2}>
              <Main />
            </Stack>
          </Box>
        </Container>
      </QueryClientProvider>
    </div>
  );
};

export default App;
