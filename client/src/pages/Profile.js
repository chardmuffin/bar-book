import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import DrinkList from '../components/DrinkList';
import FriendList from '../components/FriendList';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h3 className="bg-dark text-secondary p-3 display-inline-block">
          {user.username}
        </h3>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          {user.authoredDrinks
          ? <><h5>{user.username}'s creations: </h5><DrinkList drinks={user.authoredDrinks} /></>
          : <h5>{user.username} has not created any drinks yet.</h5>}
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
