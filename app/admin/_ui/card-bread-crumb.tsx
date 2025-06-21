"use client";

import { Breadcrumb, ConfigProvider } from 'antd';
import CardShadow from '@/components/ui/card-shadow';
import Link from 'next/link';

const CardBreadcrumb = ({ pathname }: { pathname: string }) => {
    const pathSnippets = pathname.split('/').filter(i => i);

    const breadcrumbItems = [
        ...pathSnippets.map((_, index) => {
            const url = '/' + pathSnippets.slice(0, index + 1).join('/');
            return {
                title: <Link href={url}>{decodeURIComponent(pathSnippets[index])}</Link>,
            };
        }),
    ];

    return (
        <ConfigProvider theme={{
            components: {
                Card: {
                    bodyPadding: 0,
                }
            }
        }}>
            <CardShadow>
                <Breadcrumb
                    items={breadcrumbItems}
                    style={{ margin: '10px' }}
                />
            </CardShadow>
        </ConfigProvider>
    );
};

export default CardBreadcrumb;