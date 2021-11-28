import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllDocumentsInACollection } from '../lib/firebase';

const TagsList = styled.ul`
  margin: 0 0 10px 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

const Tag = styled.button`
  border: 1px solid black;
  padding: 10px;
  border-radius: 25%;
  display: inline;
  margin: 0 10px;
`;

export default function TagsFilter() {
  const [tags, setTags] = useState([]);

  useEffect(async () => {
    const statefulTags = await getAllDocumentsInACollection('tags');
    setTags(statefulTags);
  }, []);

  return (
    <>
      <p>tags filter</p>
      <TagsList>
        {tags.map((tag) => {
          return (
            <li>
              <Tag>{tag.id}</Tag>
            </li>
          );
        })}
      </TagsList>
    </>
  );
}
