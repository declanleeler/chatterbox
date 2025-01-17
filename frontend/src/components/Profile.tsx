import { FC } from 'react';
import { GitHubUserData } from '../actions/fetchUserData';

interface ProfileProps {
  user: string | null;
}

const Profile: FC<ProfileProps> = ({ user }) => {
  if (!user) {
    return <div>user not found</div>;
  }
  return (
    <div className="info-container">
      <p>User: {user}</p>
    </div>
  );
};

export default Profile;
