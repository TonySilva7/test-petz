import React, {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
  useState,
} from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';

type CustomSelectProps = ComponentProps<'select'> & {
  setValue: UseFormSetValue<FieldValues>;
};

const CustomSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px;
  cursor: pointer;
`;

const SelectIcon = styled.span`
  margin-left: auto;
`;

const SelectItems = styled.ul<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  background-color: #f2f2f2;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const SelectOption = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const CustomSelect: ForwardRefRenderFunction<
  HTMLDivElement,
  CustomSelectProps
> = ({ setValue, children }, selectRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ReactElement | null>(
    null,
  );

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (
  //       selectRef &&
  //       selectRef.current &&
  //       !selectRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleOutsideClick);

  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [selectRef]);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ReactElement) => {
    setSelectedOption(option);
    setValue('my-Select', option.props.value);
    setIsOpen(false);
  };

  return (
    <CustomSelectWrapper ref={selectRef}>
      <SelectContainer onClick={toggleSelect}>
        <span>
          {selectedOption
            ? selectedOption.props.children
            : 'Selecione uma opção'}
        </span>
        <SelectIcon>&#8964;</SelectIcon>
      </SelectContainer>
      <SelectItems open={isOpen}>
        {React.Children.map(children, (child) => (
          <SelectOption
            onClick={() => handleOptionClick(child as ReactElement)}
          >
            {child}
          </SelectOption>
        ))}
      </SelectItems>
    </CustomSelectWrapper>
  );
};

export default forwardRef(CustomSelect);
