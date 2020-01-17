import React from 'react'
import { Layout, Page, Card, Stack } from '@shopify/polaris'

class Index extends React.Component {
  render() {
    return (
      <>
        <Page breadcrumbs={[]} title="Template Apps">
          <Layout>
            <Layout.Section>
              <Stack distribution="fill">
                <Card title="Card header">
                  <Card.Section>
                    <p>This is template app</p>
                  </Card.Section>
                </Card>
              </Stack>
            </Layout.Section>
          </Layout>
        </Page>
      </>
    )
  }
}

export default Index
