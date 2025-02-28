import React from 'react';
import Head from 'next/head';

const DiamondIframePage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Service sur-mesure | Amantys</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    height: '100vh',
                    padding: '0 20px',
                    boxSizing: 'border-box',
                }}
            >
                <iframe
                    src="/templates/sur-mesure.html"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    title="Service sur-mesure"
                />
            </div>
        </>
    );
};

export default DiamondIframePage;
