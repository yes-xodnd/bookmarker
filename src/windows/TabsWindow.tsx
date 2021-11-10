import { useMemo } from 'react';
import styled from 'styled-components';
import { moveTabIndex, closeFocusedTab, toggleCheckFocused } from 'src/store/modules/tabsSlice';
import { useToggle, useTypedDispatch, useTypedSelector } from 'src/hooks';
import { customScroll } from 'src/style';


import WindowWrapper from 'src/components/UI/WindowWrapper';
import WindowHeader from 'src/components/UI/WindowHeader';
import Toolbar from 'src/components/Tabs/TabsToolbar';
import TabGrid from 'src/components/Tabs/TabGrid';
import TabList from 'src/components/Tabs/TabList';
import ButtonAdd from 'src/components/Tabs/ButtonAdd';


const TabsWindow = () => {
  const tabs = useTypedSelector(state => state.tabs.tabs);
  const [ isListView, toggleView ] = useToggle(true);
  const dispatch = useTypedDispatch()

  const keyHandlers = useMemo(() =>({
    ArrowUp: () => dispatch(moveTabIndex(-1)),
    ArrowDown: () => dispatch(moveTabIndex(1)),
    Enter: () => dispatch(toggleCheckFocused()),
    Delete: () => dispatch(closeFocusedTab())
  }), [ dispatch ]);

  return (
    
    <WindowWrapper windowType="TABS" keyHandlers={keyHandlers}>
      <WindowHeader title='탭' windowType="TABS" />
      <Toolbar isListView={isListView} toggleView={toggleView} />
      <ContentWrapper isListView={isListView}>
        {
          isListView
          ? <TabList tabs={tabs} />
          : <TabGrid tabs={tabs} />
        }
      </ContentWrapper>
      <ButtonAdd  />
    </WindowWrapper>
  );
};

export default TabsWindow;

const ContentWrapper = styled.div<{ isListView: boolean }>`
  flex-grow: 2;
  padding: 15px;
  overflow-y: auto;
  border-bottom: 1px solid lightgrey;
  background-color: ${props => props.isListView ? 'white' : props.theme.colors.hover};
  z-index: 1;

  ${ customScroll }
`