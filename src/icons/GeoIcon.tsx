/* eslint-disable max-len */
import { FC } from 'react';

const GeoIcon: FC<any> = ({ className, props }) => (
  <svg style={{ ...className }} width="62" height="100" viewBox="0 0 62 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_613_110)">
      <path fillRule="evenodd" clipRule="evenodd" d="M31.0001 88.2857L34.0049 84.9C37.4144 80.9953 40.4811 77.2905 43.2097 73.7667L45.462 70.7953C54.8668 58.1238 59.5716 48.0667 59.5716 40.6334C59.5716 24.7667 46.7811 11.9048 31.0001 11.9048C15.2192 11.9048 2.42871 24.7667 2.42871 40.6334C2.42871 48.0667 7.13347 58.1238 16.5382 70.7953L18.7906 73.7667C22.6832 78.7543 26.7557 83.594 31.0001 88.2857Z" stroke="#6E8061" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.0005 52.3809C37.5753 52.3809 42.9052 47.051 42.9052 40.4762C42.9052 33.9014 37.5753 28.5714 31.0005 28.5714C24.4256 28.5714 19.0957 33.9014 19.0957 40.4762C19.0957 47.051 24.4256 52.3809 31.0005 52.3809Z" stroke="#6E8061" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_613_110">
        <rect width="62" height="100" fill="white" />
      </clipPath>
    </defs>
  </svg>



);

export default GeoIcon;