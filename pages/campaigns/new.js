import React from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class CampaignNew extends React.Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                })
            Router.pushRoute('/')
        } catch (err) {
            this.setState({ errorMessage: err.message });
            console.log(this.state.errorMessage);
        }
        this.setState({ loading: false });
    }
    render() {
        return (
            <Layout>
                <h3>Create a campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label='wei'
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={e => { this.setState({ minimumContribution: e.target.value }) }}
                        />
                    </Form.Field>
                    <Message
                        error
                        header='Oops'
                        content={this.state.errorMessage}
                    />
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout >
        );
    }
}

export default CampaignNew;