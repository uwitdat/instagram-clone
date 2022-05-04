import React from "react";

import { getByDisplayValue, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import Comment from "../components/comments/Comment";
import moment from "moment";

describe('Comment', () => {

  const expectedProps = {
    comment: {
      commentContent: 'test comment',
      commentedBy: {
        userName: 'test-username',
        avatar: null
      },
      createdAt: 'March 18, 2021'
    }
  }

  test('Comment props should all be visible', () => {
    const div = document.createElement('div');
    const { getByText } = render(<Comment {...expectedProps} />, div);

    const commentContent = getByText(expectedProps.comment.commentContent);
    const commentedByUser = getByText(expectedProps.comment.commentedBy.userName);
    // const commentDate = getByText(expectedProps.comment.createdAt);

    expect(commentContent).toBeVisible();
    expect(commentedByUser).toBeVisible();
    // expect(commentDate).toBeVisible();
  })
});


