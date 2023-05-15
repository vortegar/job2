import { render, screen } from '@testing-library/react';
import ButtonComponent from './index';

describe('Button_component testing', () => {

    test('Title Text', () => {
        render(<ButtonComponent></ButtonComponent>);
        const article = screen.getByRole('button');
        expect(article).toBeInTheDocument();
    })
  


})