import * as fs from 'fs'
import * as path from 'path'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware'

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
    private readonly proxyMiddleware?: RequestHandler

    constructor() {
        if (process.env.NODE_ENV === 'development') {
            this.proxyMiddleware = createProxyMiddleware({
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,
            })
        }
    }

    use(req: Request, res: Response, next: () => void) {
        if (req.originalUrl.startsWith('/api')) {
            // API endpoint - handled by server
            next()
        } else if (this.proxyMiddleware) {
            // Frontend in development - pass through to nuxt dev server
            this.proxyMiddleware(req, res, next)
        } else {
            // Frontend in production - respond with packaged file with fallback to index.html for SPA
            let filepath = req.originalUrl
            if (filepath.includes('#')) filepath = filepath.substring(0, filepath.indexOf('#'))
            if (filepath.includes('?')) filepath = filepath.substring(0, filepath.indexOf('?'))
            if (filepath === '/') filepath = '/index.html'
            filepath = path.resolve('.nuxt-dist' + filepath)

            if (fs.existsSync(filepath)) {
                res.sendFile(filepath)
            } else {
                res.sendFile(path.resolve('.nuxt-dist/index.html'))
            }
        }
    }
}
