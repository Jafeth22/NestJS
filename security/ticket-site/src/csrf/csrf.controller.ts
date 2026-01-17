import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CsrfGuard } from "./csrf.guard";

@Controller()
export class CsrfController {
  @Get("/csrf-token")
  getCsrfToken(@Req() req, @Res() res) {
    res.json({ csrfToken: req.csrfToken() });
  }

  @UseGuards(CsrfGuard)
  @Post("/protected")
  protectedRoute() {
    return { message: "CSRF token is valid, request processed!" };
  }
}
