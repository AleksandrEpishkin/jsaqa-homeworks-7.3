import { test, expect } from "@playwright/test";
const user = require("./../user");
let userName = user.login;
let passwordName = user.pass;

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(userName);
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill(passwordName);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
  await page.getByText("Вы остановились здесь. Продолжим?").click();
});

test("unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("fjdfj@cjdd.hhf");
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill("jdeg8sk");
  await page.getByTestId("login-submit-btn").click();
  await page.getByTestId("login-error-hint").click();
});
