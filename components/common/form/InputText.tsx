import { useDebounce } from '@/hooks/useDebounce'
import {
  TextInputProps as MantineTextInputProps,
  TextInput,
} from '@mantine/core'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  Controller,
  FieldError,
  FieldValues,
  RefCallBack,
  UseFormSetValue,
  useFormContext,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IconType } from 'react-icons/lib'

type InputTextProps = {
  name: string
  label?: string
  size?: string
  radius?: string
  icon?: IconType
  description?: string
  placeholder?: string
  required?: boolean
  type?: string
  inputClassName?: string
  debounce?: boolean
  forSpecification?: boolean
} & Omit<MantineTextInputProps, 'icon'>

export interface InputTextPureProps
  extends Omit<MantineTextInputProps, 'error' | 'icon'> {
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
  error?: FieldError
  innerRef?: RefCallBack
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  inputClassName?: string
  className?: string
  required?: boolean
  forSpecification?: boolean
}

type InputTextPureDebouncedProps = InputTextPureProps & {
  setValue: UseFormSetValue<FieldValues>
  name: string
}

export const InputText = ({
  name,
  icon,
  debounce,
  ...props
}: InputTextProps) => {
  const { control, setValue } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return debounce ? (
          <InputTextPureDebounced
            {...field}
            {...props}
            innerRef={ref}
            error={error}
            icon={icon}
            setValue={setValue}
          />
        ) : (
          <InputTextPure
            {...field}
            {...props}
            innerRef={ref}
            error={error}
            icon={icon}
          />
        )
      }}
    />
  )
}

export const InputTextPure = ({
  label,
  placeholder,
  error,
  innerRef,
  onChange,
  value,
  inputClassName,
  className,
  required,
  forSpecification,
  ...props
}: InputTextPureProps) => {
  const { t } = useTranslation()

  return (
    <div className={`${forSpecification ? 'h-full' : ''} ${className}`}>
      <span>
        {label}
        {label && required ? (
          <span className="text-red-600 ml-0.5">*</span>
        ) : (
          ''
        )}
      </span>
      <TextInput
        ref={innerRef}
        placeholder={placeholder || label}
        error={
          error?.message &&
          (error?.message.startsWith('forms:')
            ? t(error?.message)
            : error?.message)
        }
        onChange={onChange}
        value={value ?? ''}
        classNames={{
          input: `${
            forSpecification &&
            '!bg-transparent border-b border-x-[0] border-t-[0] rounded-none rounded-br-md h-full pl-4 md:pl-10'
          } ${inputClassName}`,
          root: `${forSpecification && 'h-full'}`,
          wrapper: `${forSpecification && 'h-full'}`,
        }}
        required={required}
        {...props}
      />
    </div>
  )
}

export const InputTextPureDebounced = ({
  label,
  placeholder,
  error,
  innerRef,
  onChange,
  value,
  inputClassName,
  className,
  required,
  ...props
}: InputTextPureDebouncedProps) => {
  const { t } = useTranslation()
  const [state, setState] = useState<string | null | undefined>(value)
  const debouncedValue = useDebounce<string | null | undefined>(state, 300)

  useEffect(() => {
    if (debouncedValue !== undefined) {
      onChange?.({
        target: { value: debouncedValue },
      } as ChangeEvent<HTMLInputElement>)
    }
  }, [debouncedValue, onChange])

  useEffect(() => {
    setState(value)
  }, [value])

  return (
    <div className={className}>
      <span>
        {label}
        {required ? <span className="text-red-600 ml-0.5">*</span> : ''}
      </span>
      <TextInput
        ref={innerRef}
        placeholder={placeholder || label}
        error={
          error?.message &&
          (error?.message.startsWith('forms:')
            ? t(error?.message)
            : error?.message)
        }
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setState(event.target.value)
        }}
        value={state ?? ''}
        classNames={{
          input: inputClassName,
        }}
        required={required}
        {...props}
      />
    </div>
  )
}
