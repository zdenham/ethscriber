import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export const useMixpanel = () => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
      console.log('no mixpanel token');
      return;
    }

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '', {
      debug: false,
      track_pageview: true,
      persistence: 'localStorage',
    });
  }, []);
};

export const identify = (address: string) => {
  mixpanel.identify(address);
};

export const track = (
  event: string,
  properties: { [key: string]: any } | undefined
) => {
  mixpanel.track(event, properties);
};
