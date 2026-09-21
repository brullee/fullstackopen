import { test, describe, expect } from '@playwright/test'

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(
      page.getByText(
        'Pokémon and Pokémon character names are trademarks of Nintendo.',
      ),
    ).toBeVisible()
  })
  test("user can navigate to ivysaur's page from main page", async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByText('ivysaur').click()
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})
