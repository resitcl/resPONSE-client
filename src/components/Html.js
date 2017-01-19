import React, { PropTypes } from 'react';
import { analytics } from '../config';

function Html({ title, description, style, script, children }) {
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/bootstrap-social.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/sb-admin.css" />
        <style id="css" dangerouslySetInnerHTML={{ __html: style }} />

        <link rel="apple-touch-icon" sizes="57x57" href="apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"/>
        <link rel="manifest" href="manifest.json"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/> 

      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {script && <script src={script} />}
        {analytics.google.trackingId &&
          <script
            dangerouslySetInnerHTML={{ __html:
            'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
            `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
          />
        }
        {analytics.google.trackingId &&
          <script src="https://www.google-analytics.com/analytics.js" async defer />
        }
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
};

export default Html;
