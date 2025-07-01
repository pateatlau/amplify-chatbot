import * as React from 'react';
import {
  Flex,
  TextAreaField,
  Loader,
  Text,
  View,
  Button,
} from '@aws-amplify/ui-react';
import { useAIGeneration } from './client';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function App() {
  const [description, setDescription] = React.useState('');
  const [{ data, isLoading }, generateRecipe] =
    useAIGeneration('generateRecipe');
  const { signOut } = useAuthenticator();

  const handleClick = async () => {
    generateRecipe({ description });
  };

  return (
    <section className="p-10 overflow-hidden h-[90vh]">
      <Flex direction="column">
        <div className="flex flex-row justify-between align-middle">
          <h1 className="text-3xl text-orange-600">DIY Assistant</h1>
          <button
            className="p-2 text-white bg-red-500 border rounded-md cursor-pointer border-neutral-500 hover:bg-red-700"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
        <Flex direction="column">
          <TextAreaField
            autoResize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Prompt"
            placeholder="Please enter your prompt here"
          />
          <Button
            onClick={handleClick}
            variation="primary"
          >
            Submit Prompt
          </Button>
        </Flex>
        {isLoading ? (
          <Loader variation="linear" />
        ) : (
          <div className="p-5 mt-5 overflow-auto border-2 border-gray-200 rounded-lg max-h-[48vh]">
            <Text fontWeight="bold">{data?.name}</Text>
            <View as="ul">
              {data?.ingredients?.map((ingredient) => (
                <View
                  as="li"
                  key={ingredient}
                >
                  {ingredient}
                </View>
              ))}
            </View>
            <h2 className="mt-5 mb-2 font-bold">INSTRUCTIONS:</h2>
            <Text>{data?.instructions ? data?.instructions : ''}</Text>
          </div>
        )}
      </Flex>
    </section>
  );
}
