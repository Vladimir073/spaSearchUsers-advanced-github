import { memo } from 'react';
import styled from 'styled-components';

export const SApp = styled.div`
    text-align: center;
`;

export const SLoader = memo(styled.p`
    display: flex;
    justify-content: center;
    align-items: center;

    & .loader {
        background-color: #2c394b;
        border: 8px solid #f3f3f3;
        border-top: 8px solid #ff4c29;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
`);

export const SContainer = styled.div`
    max-width: 1110px;
    margin: 0 auto;
`;

export const SHeader = memo(styled.header`
    background-color: #082032;

    & .wrapper {
        display: flex;
        padding: 15px 0;
        align-items: center;
        justify-content: space-between;

        & nav {
            display: flex;
            gap: 25px;

            & a {
                color: white;
                font-size: 1.25rem;
                padding-bottom: 3px;
                border-bottom: 1px solid transparent;
                transition: 0.3s ease-in;

                &:hover {
                    border-color: #ff4c29;
                }

                &.active {
                    color: #ff4c29;
                }
            }
        }
    }
`);

export const SLogo = memo(styled.a`
    color: #d2d2d2;
    font-size: 2rem;
    text-transform: uppercase;
    cursor: pointer;
`);

export const SMain = memo(styled.main`
    background-color: #2c394b;
    min-height: calc(100vh - 73px);
    padding-top: 4rem;
    display: flex;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;

    & h1 {
        font-size: 3rem;
    }
    & ul {
        margin: 10px auto 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 500px;
        align-items: flex-start;
    }
`);

export const SInput = memo(styled.input`
    margin-top: 20px;
    padding: 10px;
    width: 350px;
    border-radius: 5px;
    border: 2px solid #2c394b;
    transition: 0.3s ease-in;
    font-size: 1.25rem;

    &:focus {
        border-color: #ff4c29;
    }
`);

export const SItem = memo(styled.li`
    padding-left: 5px;

    cursor: pointer;
`);

export const SLink = memo(styled.a`
    color: #d2d2d2;
`);
