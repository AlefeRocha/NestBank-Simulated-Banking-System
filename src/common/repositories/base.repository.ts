/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { HttpService } from '@nestjs/axios'
import { HttpException, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'
import { firstValueFrom } from 'rxjs/internal/firstValueFrom'
import { catchError } from 'rxjs/internal/operators/catchError'

export type FieldOptions = {
  field: string
  type: string
}

export type GraphQLError = {
  extensions: { path: string; code: string }
  message: string
}

export type GraphQLResponse<T = any> = {
  data: { [key: string]: T }
  errors: Array<GraphQLError>
}

export abstract class BaseRepository {
  protected logger: Logger = new Logger()

  constructor(protected readonly httpService: HttpService) {}

  protected get endpoint(): string {
    return process.env.HASURA_GRAPHQL_URL ?? 'http://localhost:8080/v1/graphql'
  }

  protected async fetchGraphQL<T = GraphQLResponse>({
    body,
    headers,
    language,
    throwErrors = true,
  }: {
    body: any
    headers?: any
    language?: string
    throwErrors?: boolean
  }): Promise<T> {
    headers = { ...this.defaultHeaders({ language }), ...headers }

    const { data } = await firstValueFrom(
      this.httpService
        .post(this.endpoint, body, {
          headers,
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log({ error })
            if (error?.code === 'ECONNREFUSED') {
              throw new HttpException('Hasura is not available', 500)
            }
            this.logger.error(error.message)
            throw new Error(error?.response['errors'][0])
          }),
        ),
    )

    return data
  }

  protected defaultHeaders(options?: { language?: string }): { [key: string]: any } {
    return {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET ?? '123456',
    }
  }
}
