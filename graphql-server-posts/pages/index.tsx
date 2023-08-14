import { gql, useMutation, useQuery } from '@apollo/client';

const CREATE_POST = gql`
  mutation createPost($input: PostInput!) {
    createPost(input: $input) {
      text
      image
    }
  }
`;

export default function Home() {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  return (
    <div>
      <button
        style={{
          backgroundColor: 'blue',
          width: '100px',
          height: '50px',
          color: 'white',
          borderRadius: '10px',
        }}
        onClick={() =>
          createPost({
            variables: {
              input: {
                text: 'lorem',
                image: [
                  'https://www.discovermongolia.mn/uploads/gallery_UB.jpg',
                ],
              },
            },
          })
        }
      >
        Add Post
      </button>
    </div>
  );
}
