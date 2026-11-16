import { useEffect, useState } from 'react';
import { Button, Heading, Flex, View, Divider, useAuthenticator } from '@aws-amplify/ui-react';
import { client } from './amplify.js';

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState('Loading your profile…');
  const { signOut } = useAuthenticator((context) => [context.user]);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const { data, errors } = await client.models.UserProfile.list();
        if (errors?.length) throw new Error(errors.map((error) => error.message).join('; '));
        if (active) {
          setProfiles(data);
          setStatus(data.length ? '' : 'No profile found. Create and confirm a new account to generate your profile.');
        }
      } catch (error) {
        if (active) setStatus(`Unable to load your profile: ${error.message}`);
      }
    }
    load();
    return () => { active = false; };
  }, []);
  return (
    <Flex as="main" direction="column" alignItems="center" gap="2rem" className="profile-app">
      <Heading level={1}>My Profile</Heading>
      <Heading level={2}>Grayson Turner</Heading>
      <Divider />
      {status && <p role="status">{status}</p>}
      {profiles.map((profile) => (
        <View key={profile.id} className="profile-card">
          <p>Email address</p>
          <Heading level={3}>{profile.email}</Heading>
        </View>
      ))}
      <Button onClick={signOut}>Sign Out</Button>
    </Flex>
  );
}
