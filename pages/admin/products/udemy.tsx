{/* <Grid item xs={12} sm={5}>
                    <TextField
                      label="size"
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register(`price.${index}`, {
                        required: 'This field is required',
                        minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                      })}
                      error={!!errors.price}
                      helperText={errors.title?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label="Price"
                      type="number"
                      variant="filled"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register(`price.${index}`, {
                        required: 'This field is required',
                        min: {
                          value: 0,
                          message: 'The price cannot be less than 0',
                        },
                      })}
                      error={!!errors.price}
                      helperText={errors.title?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => removeUser(index)}
                      color="error"
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Grid> */}