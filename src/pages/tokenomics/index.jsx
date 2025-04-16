import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './Tokenomics.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Tokenomics = () => {
    const data = [
        {
            name: 'Token Sale',
            value: 40,
            amount: '2,000,000,000',
            details: 'Public and private sale allocations'
        },
        {
            name: 'Ecosystem Development',
            value: 30,
            amount: '1,500,000,000',
            details: 'Game rewards, community events, and partnership programs'
        },
        {
            name: 'Team & Advisors',
            value: 18,
            amount: '900,000,000',
            details: '2-year vesting period with monthly unlocks'
        },
        {
            name: 'Marketing & Operations',
            value: 12,
            amount: '600,000,000',
            details: 'Market making, exchange listings, and marketing campaigns'
        }
    ];

    const COLORS = ['#ffde00', '#ff9d00', '#ff6b00', '#ff5c4d'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.8;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '16px', fontWeight: '500' }}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className={styles.tooltipContainer}>
                    <p className={styles.tooltipName}>{data.name}</p>
                    <p className={styles.tooltipValue}>{data.value}%</p>
                    <p className={styles.tooltipAmount}>{data.amount} MOVLY</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <Header />
            <div style={{ minHeight: 'calc(100vh - 53px)', display: 'flex', flexDirection: 'column', paddingBottom: '100px' }}>
                <h1 className={styles.title}>Tokenomics</h1>
                <p className={styles.subtitle}>Understanding the distribution and utility of $MOVLY</p>

                <div className={styles.mainContent}>
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={450}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            strokeWidth={0}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.leftColumn}>
                            <div className={styles.legendContainer}>
                                {data.map((entry, index) => (
                                    <div key={index} className={styles.legendItem}>
                                        <div className={styles.legendHeader}>
                                            <span
                                                className={styles.legendColor}
                                                style={{ backgroundColor: COLORS[index] }}
                                            />
                                            <span className={styles.legendTitle}>{entry.name}</span>
                                            <span className={styles.legendPercentage}>{entry.value}%</span>
                                        </div>
                                        <div className={styles.legendContent}>
                                            <div className={styles.legendAmount}>{entry.amount} MOVLY</div>
                                            <div className={styles.legendDetails}>{entry.details}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.rightColumn}>
                            <div className={styles.totalSupply}>
                                <h3>Total Supply</h3>
                                <div className={styles.supplyAmount}>5,000,000,000 MOVLY</div>
                                <p className={styles.supplyDescription}>Maximum tokens that will ever exist</p>
                            </div>

                            <div className={styles.tokenDetails}>
                                <div className={styles.infoCard}>
                                    <div className={styles.label}>Token Name</div>
                                    <div className={styles.value}>MOVLY</div>
                                </div>
                                <div className={styles.infoCard}>
                                    <div className={styles.label}>Token Symbol</div>
                                    <div className={styles.value}>MOVLY</div>
                                </div>
                                <div className={styles.infoCard}>
                                    <div className={styles.label}>Network</div>
                                    <div className={styles.value}>BNB Chain</div>
                                </div>
                                <div className={styles.infoCard}>
                                    <div className={styles.label}>Token Standard</div>
                                    <div className={styles.value}>BEP-20</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer_container}>
                <Footer />
            </div>
        </div>
    );
};

export default Tokenomics;