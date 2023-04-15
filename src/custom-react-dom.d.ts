import React from 'react';

declare global {
  namespace ReactDOM {
    function createRoot(container: Element | Document | null | undefined): React.Root;
  }
}
