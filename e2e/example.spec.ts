import { expect, test } from '@playwright/test'

test('Test for testing playwright functionality, should visit google.com', async ({
  page,
}) => {
  await page.goto('https://www.google.com/')

  const mailText = page.getByText('Gmail')

  expect(mailText).toBeDefined()
})
