import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionsCreators, State } from "../state";
import { coin, cryptoType } from "../state/reducers/CryptoReducer";
import { Layout, Input, List} from 'antd';
import Avatar from "antd/lib/avatar/avatar";
import CoinDetails from "./CoinDetails";

import "./CryptoList.css";

const { Header , Content, Sider} = Layout;

interface ICryptoProps {
    cryptoInfo: cryptoType
}

const CryptoList  = (props: ICryptoProps) => {

    let {searchText, coinsList, collapsed} = props.cryptoInfo;

    const dispatch = useDispatch();
    const {setSearchText, toggleCollapse, setSelectedCoin} = bindActionCreators(actionsCreators, dispatch);

    const handleInputChange  = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);
    if(searchText) {
        coinsList = coinsList.filter((coin)=> coin.name.toLowerCase().includes(searchText.toLowerCase()))
    }
    const onCollapse = () => toggleCollapse(!collapsed);

    const onCoinSelect = (item: coin) => {
        setSelectedCoin(item);
    }

    const cryptoInfo: cryptoType = useSelector((state: State) => state.cryptoCoins);
    
    return (
        <>
        <Layout className="layout">
            <Content className='layout-content'>
                
                <Sider className='layout-sidebar'>
                    <div className="list-info">
                        <div className='toggle-icon'></div>
                        <div>Cryptos({coinsList.length})</div>
                    </div>
                    <div className="list-wrapper">
                    <Input placeholder="Search" type="text" onChange={handleInputChange} style={{ width: 200 }} />
                    <List className='coin-list'
                        itemLayout="horizontal"
                        dataSource={coinsList}
                        rowKey="id"
                        renderItem={item => (
                            <List.Item onClick={(e)=> onCoinSelect(item)}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.icon} />}
                                title={item.symbol}
                                description={item.name}
                            />
                            </List.Item>
                        )}
                    />
                    </div>
                    
                </Sider>    
                <Layout className="layout">
                    <Header className="layout-header">My Cryptos</Header>
                    <Content className='card-wrapper'>
                        { 
                        cryptoInfo.selectedCoin
                          ?  (<CoinDetails details={cryptoInfo.selectedCoin} />)
                          : (<div className='empty-card-state'>Select coin to see more details</div>)
                        }
                        
                    </Content>
                </Layout>
            </Content>
        </Layout>
        </>

    )
    }
    export default CryptoList;