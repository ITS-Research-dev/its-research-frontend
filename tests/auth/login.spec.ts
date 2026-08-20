import { test, expect } from "@playwright/test";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const LOGIN_URL = "/auth/login";
const STUDENT_DASHBOARD = "/student/materials";
const TEACHER_DASHBOARD = "/teacher/dashboard";

/** Clear browser state before each test */
test.beforeEach(async ({ page, context }) => {
  await context.clearCookies();
  await context.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

// ─────────────────────────────────────────────────────────────
// 1. PAGE RENDERING
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Rendering", () => {
  test("should render login page with all expected elements", async ({
    page,
  }) => {
    await page.goto(LOGIN_URL);

    await expect(page.getByRole("heading", { name: "Koda" })).toBeVisible();
    await expect(page.getByText("Asesmen Adaptif")).toBeVisible();
    await expect(page.getByLabel("NISN / NIP")).toBeVisible();
    await expect(page.getByLabel("Kata Sandi")).toBeVisible();
    await expect(page.getByRole("button", { name: "Masuk" })).toBeVisible();

    const passwordInput = page.getByLabel("Kata Sandi");
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should show background image on login page", async ({ page }) => {
    await page.goto(LOGIN_URL);
    const main = page.locator("main");
    await expect(main).toHaveCSS("background-image", /bg-login/);
  });
});

// ─────────────────────────────────────────────────────────────
// 2. PASSWORD VISIBILITY TOGGLE
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Password Visibility Toggle", () => {
  test("should toggle password from hidden to visible when eye icon is clicked", async ({
    page,
  }) => {
    await page.goto(LOGIN_URL);
    const passwordInput = page.getByLabel("Kata Sandi");
    await expect(passwordInput).toHaveAttribute("type", "password");

    await page.locator('form button[type="button"]').click();
    await expect(passwordInput).toHaveAttribute("type", "text");
  });

  test("should toggle password from visible back to hidden on second click", async ({
    page,
  }) => {
    await page.goto(LOGIN_URL);
    const passwordInput = page.getByLabel("Kata Sandi");
    const toggleBtn = page.locator('form button[type="button"]');

    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });
});

// ─────────────────────────────────────────────────────────────
// 3. FORM VALIDATION
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Form Validation", () => {
  test("should prevent submission when username is empty", async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.getByLabel("Kata Sandi").fill("anypassword");
    await page.getByRole("button", { name: "Masuk" }).click();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("should prevent submission when password is empty", async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("anyuser");
    await page.getByRole("button", { name: "Masuk" }).click();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("should prevent submission when both fields are empty", async ({
    page,
  }) => {
    await page.goto(LOGIN_URL);
    await page.getByRole("button", { name: "Masuk" }).click();
    await expect(page).toHaveURL(LOGIN_URL);
  });
});

// ─────────────────────────────────────────────────────────────
// 4. SUCCESSFUL LOGIN – STUDENT
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Successful Login (Student)", () => {
  test("should redirect to student dashboard on successful login as student", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Login berhasil",
          access_token: "mock-student-token",
          user: {
            name: "Budi Santoso",
            role: "Siswa",
            classId: [
              {
                class: { id: "class-1", title: "X RPL 1", waliKelas: "Pak Ahmad" },
                state: "active",
              },
            ],
          },
        }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("1234567890");
    await page.getByLabel("Kata Sandi").fill("password123");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page.getByText("Sedang masuk...")).toBeVisible();
    await expect(page).toHaveURL(STUDENT_DASHBOARD, { timeout: 5000 });
  });

  test("should save access_token in localStorage and cookie after student login", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Login berhasil",
          access_token: "mock-student-token",
          user: { name: "Budi Santoso", role: "Siswa", classId: [] },
        }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("1234567890");
    await page.getByLabel("Kata Sandi").fill("password123");
    await page.getByRole("button", { name: "Masuk" }).click();
    await page.waitForURL(STUDENT_DASHBOARD, { timeout: 5000 });

    const token = await page.evaluate(() => localStorage.getItem("access_token"));
    expect(token).toBe("mock-student-token");

    const cookies = await page.context().cookies();
    const tokenCookie = cookies.find((c) => c.name === "access_token");
    expect(tokenCookie?.value).toBe("mock-student-token");
  });

  test("should save user data in localStorage after login", async ({
    page,
  }) => {
    const mockUser = { name: "Budi Santoso", role: "Siswa", classId: [] };

    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Login berhasil",
          access_token: "mock-student-token",
          user: mockUser,
        }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("1234567890");
    await page.getByLabel("Kata Sandi").fill("password123");
    await page.getByRole("button", { name: "Masuk" }).click();
    await page.waitForURL(STUDENT_DASHBOARD, { timeout: 5000 });

    const storedUser = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("user") ?? "null")
    );
    expect(storedUser).toMatchObject(mockUser);
  });
});

// ─────────────────────────────────────────────────────────────
// 5. SUCCESSFUL LOGIN – TEACHER
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Successful Login (Teacher)", () => {
  test("should redirect to teacher dashboard on successful login as teacher", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Login berhasil",
          access_token: "mock-teacher-token",
          user: {
            name: "Pak Ahmad",
            role: "Guru",
            classId: [
              {
                class: { id: "class-1", title: "X RPL 1", waliKelas: "Pak Ahmad" },
                state: "active",
              },
            ],
          },
        }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("19850101001");
    await page.getByLabel("Kata Sandi").fill("teacherpass");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page).toHaveURL(TEACHER_DASHBOARD, { timeout: 5000 });
  });
});

// ─────────────────────────────────────────────────────────────
// 6. FAILED LOGIN – ERROR HANDLING
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Failed Login (Error Handling)", () => {
  test("should show error modal on wrong credentials (401)", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Username atau password salah" }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("wronguser");
    await page.getByLabel("Kata Sandi").fill("wrongpass");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page.getByText("Login Gagal")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Username atau password salah")).toBeVisible();
  });

  test("should show generic fallback error message when API returns no message", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({}),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("someuser");
    await page.getByLabel("Kata Sandi").fill("somepass");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page.getByText("Login Gagal")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Terjadi kesalahan.")).toBeVisible();
  });

  test("should show error modal when network is unavailable", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.abort("failed");
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("someuser");
    await page.getByLabel("Kata Sandi").fill("somepass");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page.getByText("Login Gagal")).toBeVisible({ timeout: 5000 });
  });

  test("should close error modal when close button is clicked", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Unauthorized" }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("wronguser");
    await page.getByLabel("Kata Sandi").fill("wrongpass");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page.getByText("Login Gagal")).toBeVisible({ timeout: 5000 });
    await page.getByRole("button", { name: /tutup|close|ok/i }).click();

    await expect(page.getByText("Login Gagal")).not.toBeVisible();
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test("should allow retrying login after an error", async ({ page }) => {
    let callCount = 0;

    await page.route("**/auth/login", async (route) => {
      callCount++;
      if (callCount === 1) {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ message: "Password salah" }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            message: "Login berhasil",
            access_token: "mock-token",
            user: { name: "Budi", role: "Siswa", classId: [] },
          }),
        });
      }
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("someuser");
    await page.getByLabel("Kata Sandi").fill("wrongpass");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page.getByText("Login Gagal")).toBeVisible({ timeout: 5000 });
    await page.getByRole("button", { name: /tutup|close|ok/i }).click();

    await page.getByLabel("Kata Sandi").fill("correctpass");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page).toHaveURL(STUDENT_DASHBOARD, { timeout: 5000 });
  });
});

// ─────────────────────────────────────────────────────────────
// 7. LOADING STATE
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Loading State", () => {
  test("should show loading spinner while login request is in flight", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Login berhasil",
          access_token: "mock-token",
          user: { name: "Budi", role: "Siswa", classId: [] },
        }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("someuser");
    await page.getByLabel("Kata Sandi").fill("somepass");
    await page.getByRole("button", { name: "Masuk" }).click();

    await expect(page.getByText("Sedang masuk...")).toBeVisible();
  });

  test("should enforce minimum 1200ms loading display even on fast responses", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Login berhasil",
          access_token: "mock-token",
          user: { name: "Budi", role: "Siswa", classId: [] },
        }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("someuser");
    await page.getByLabel("Kata Sandi").fill("somepass");

    const start = Date.now();
    await page.getByRole("button", { name: "Masuk" }).click();
    await page.waitForURL(STUDENT_DASHBOARD, { timeout: 5000 });
    const elapsed = Date.now() - start;

    // LoginForm enforces a minimum 1200ms loading duration
    expect(elapsed).toBeGreaterThanOrEqual(1200);
  });
});

// ─────────────────────────────────────────────────────────────
// 8. MIDDLEWARE / ROUTE GUARD
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Middleware / Route Guards", () => {
  test("should redirect unauthenticated user from /student to /auth/login", async ({
    page,
  }) => {
    await page.goto("/student/materials");
    await expect(page).toHaveURL(/\/auth\/login/, { timeout: 5000 });
  });

  test("should redirect unauthenticated user from /teacher to /auth/login", async ({
    page,
  }) => {
    await page.goto("/teacher/dashboard");
    await expect(page).toHaveURL(/\/auth\/login/, { timeout: 5000 });
  });

  test("should redirect authenticated user away from /auth/login to /student/materials", async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: "access_token",
        value: "mock-valid-token",
        domain: "localhost",
        path: "/",
        expires: Date.now() / 1000 + 86400,
      },
    ]);

    await page.goto(LOGIN_URL);
    await expect(page).toHaveURL(STUDENT_DASHBOARD, { timeout: 5000 });
  });

  test("should not allow authenticated user to stay on /auth/* pages", async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: "access_token",
        value: "mock-valid-token",
        domain: "localhost",
        path: "/",
        expires: Date.now() / 1000 + 86400,
      },
    ]);

    await page.goto("/auth/login");
    await expect(page).not.toHaveURL(/\/auth\//, { timeout: 5000 });
  });
});

// ─────────────────────────────────────────────────────────────
// 9. ACCESSIBILITY
// ─────────────────────────────────────────────────────────────
test.describe("Login Page – Accessibility", () => {
  test("should be able to submit form using Enter key", async ({ page }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Login berhasil",
          access_token: "mock-token",
          user: { name: "Budi", role: "Siswa", classId: [] },
        }),
      });
    });

    await page.goto(LOGIN_URL);
    await page.getByLabel("NISN / NIP").fill("someuser");
    await page.getByLabel("Kata Sandi").fill("somepass");
    await page.getByLabel("Kata Sandi").press("Enter");

    await expect(page).toHaveURL(STUDENT_DASHBOARD, { timeout: 5000 });
  });

  test("should be able to navigate form fields with Tab key", async ({
    page,
  }) => {
    await page.goto(LOGIN_URL);

    await page.getByLabel("NISN / NIP").focus();
    await page.keyboard.press("Tab");

    const passwordInput = page.getByLabel("Kata Sandi");
    await expect(passwordInput).toBeFocused();
  });
});
